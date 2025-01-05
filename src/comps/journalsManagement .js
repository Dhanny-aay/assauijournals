import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { useSnackbar } from "notistack";
import Skeleton from "react-loading-skeleton";

const JournalsManagement = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSlideOver, setShowSlideOver] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    excerpt: "",
    fileUrl: "",
    fileName: "",
    coverImageUrl: "",
  });
  const [editingJournal, setEditingJournal] = useState(null);

  // Pagination states
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 6;

  const storage = getStorage();
  const db = getFirestore();
  const journalsRef = collection(db, "journals");

  // Fetch journals with pagination
  const fetchJournals = async (isInitial = false) => {
    try {
      let q;
      if (isInitial) {
        q = query(journalsRef, orderBy("name"), limit(ITEMS_PER_PAGE));
      } else {
        if (!lastVisible) return;
        q = query(
          journalsRef,
          orderBy("name"),
          startAfter(lastVisible),
          limit(ITEMS_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(q);
      const journalsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHasMore(querySnapshot.docs.length === ITEMS_PER_PAGE);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      if (isInitial) {
        setJournals(journalsData);
      } else {
        setJournals((prev) => [...prev, ...journalsData]);
      }
    } catch (error) {
      enqueueSnackbar("Error fetching journals", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals(true);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        enqueueSnackbar("Please upload an image file", { variant: "error" });
        return;
      }
      // Check file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        enqueueSnackbar("Image size should be less than 5MB", {
          variant: "error",
        });
        return;
      }
      setSelectedImage(file);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, coverImageUrl: previewUrl }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is PDF
      if (file.type !== "application/pdf") {
        enqueueSnackbar("Please upload a PDF file", { variant: "error" });
        return;
      }
      // Check file size (30MB limit)
      if (file.size > 30 * 1024 * 1024) {
        enqueueSnackbar("File size should be less than 30MB", {
          variant: "error",
        });
        return;
      }
      setSelectedFile(file);
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let fileUrl = formData.fileUrl;
      let fileName = formData.fileName;
      let coverImageUrl = formData.coverImageUrl;

      // Upload PDF if selected
      if (selectedFile) {
        const storageRef = ref(
          storage,
          `journals/${selectedFile.name}-${Date.now()}`
        );
        await uploadBytes(storageRef, selectedFile);
        fileUrl = await getDownloadURL(storageRef);
        fileName = selectedFile.name;
      }

      // Upload cover image if selected
      if (selectedImage) {
        const imageRef = ref(
          storage,
          `journal-covers/${selectedImage.name}-${Date.now()}`
        );
        await uploadBytes(imageRef, selectedImage);
        coverImageUrl = await getDownloadURL(imageRef);
      }

      const journalData = {
        name: formData.name,
        excerpt: formData.excerpt,
        fileUrl,
        fileName,
        coverImageUrl,
        uploadedAt: new Date().toISOString(),
      };

      if (editingJournal) {
        await updateDoc(doc(db, "journals", editingJournal.id), journalData);
        enqueueSnackbar("Journal updated successfully!", {
          variant: "success",
        });
      } else {
        await addDoc(journalsRef, journalData);
        enqueueSnackbar("Journal added successfully!", { variant: "success" });
      }

      resetForm();
      fetchJournals(true);
    } catch (error) {
      enqueueSnackbar("Error saving journal", { variant: "error" });
    } finally {
      setSubmitting(false);
      setShowSlideOver(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      excerpt: "",
      fileUrl: "",
      fileName: "",
      coverImageUrl: "",
    });
    setSelectedFile(null);
    setSelectedImage(null);
    setEditingJournal(null);
  };

  const handleDelete = async (journalId) => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      try {
        await deleteDoc(doc(db, "journals", journalId));
        enqueueSnackbar("Journal deleted successfully!", {
          variant: "success",
        });
        fetchJournals(true);
      } catch (error) {
        enqueueSnackbar("Error deleting journal", { variant: "error" });
      }
    }
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setFormData({
      name: journal.name,
      excerpt: journal.excerpt,
      fileUrl: journal.fileUrl,
      fileName: journal.fileName,
    });
    setShowSlideOver(true);
  };

  if (loading) {
    return <Skeleton count={5} height={100} className="mb-4" />;
  }

  return (
    <div className="relative">
      {/* Main Content */}
      <div className="px-4">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium font-Ubuntu">Journals</h2>
          <button
            onClick={() => {
              resetForm();
              setShowSlideOver(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 text-sm font-Ubuntu rounded-md hover:bg-blue-600"
          >
            Add Journal
          </button>
        </div>

        {/* Empty State */}
        {journals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="mt-2 text-sm font-Ubuntu font-medium text-gray-900">
              No journals
            </h3>
            <p className="mt-1 text-sm font-Archivo text-gray-500">
              Get started by adding a new journal.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowSlideOver(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-Ubuntu text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                Add Journal
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Journals Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {journals.map((journal) => (
                <div
                  key={journal.id}
                  className="bg-white rounded-lg border border-[#979797]"
                >
                  {journal.coverImageUrl && (
                    <div className="mb-4 aspect-video relative overflow-hidden rounded-lg">
                      <img
                        src={journal.coverImageUrl}
                        alt={journal.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}

                  <div className=" w-full p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg font-Archivo">
                        {journal.name}
                      </h3>
                      <a
                        href={journal.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm font-Ubuntu mb-4">
                      {journal.excerpt}
                    </p>
                    <div className="text-sm text-gray-500 mb-4 font-Ubuntu">
                      File: {journal.fileName}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(journal)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-Archivo hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(journal.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-Archivo hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => fetchJournals(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white font-Ubuntu hover:bg-gray-50"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Slide Over Panel */}
      {showSlideOver && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowSlideOver(false)}
            />

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  {/* Header */}
                  <div className="px-4 py-6 bg-gray-50 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-Archivo font-medium text-gray-900">
                        {editingJournal ? "Edit Journal" : "Add New Journal"}
                      </h2>
                      <button
                        onClick={() => setShowSlideOver(false)}
                        className="rounded-md text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                      <div>
                        <label className="block text-sm font-Archivo font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 w-full px-4 py-2 border font-Ubuntu text-sm rounded-md"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-medium font-Ubuntu text-sm text-gray-700">
                          Excerpt
                        </label>
                        <textarea
                          className="mt-1 w-full px-4 py-2 border rounded-md"
                          value={formData.excerpt}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              excerpt: e.target.value,
                            })
                          }
                          required
                          rows={4}
                        />
                      </div>

                      <div>
                        <label className="block font-Ubuntu text-sm font-medium text-gray-700">
                          PDF File
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            {selectedFile || formData.fileName ? (
                              <div className="mb-4">
                                <p className="text-sm text-gray-600">
                                  Current file:{" "}
                                  {selectedFile?.name || formData.fileName}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedFile(null);
                                    setFormData((prev) => ({
                                      ...prev,
                                      fileName: "",
                                    }));
                                  }}
                                  className="mt-2 text-sm font-Ubuntu text-red-500"
                                >
                                  Remove File
                                </button>
                              </div>
                            ) : (
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                            <div className="flex text-sm text-gray-600">
                              <label className="relative cursor-pointer bg-white rounded-md font-Ubuntu font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload a file</span>
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  className="sr-only"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs font-Ubuntu text-gray-500">
                              PDF files up to 30MB
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* cover image upload */}
                      <div>
                        <label className="block font-Ubuntu text-sm font-medium text-gray-700">
                          Cover Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            {formData.coverImageUrl ? (
                              <div className="mb-4">
                                <img
                                  src={formData.coverImageUrl}
                                  alt="Cover preview"
                                  className="mx-auto h-32 object-cover rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedImage(null);
                                    setFormData((prev) => ({
                                      ...prev,
                                      coverImageUrl: "",
                                    }));
                                  }}
                                  className="mt-2 text-sm font-Ubuntu text-red-500"
                                >
                                  Remove Image
                                </button>
                              </div>
                            ) : (
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                            <div className="flex text-sm text-gray-600">
                              <label className="relative cursor-pointer bg-white rounded-md font-Ubuntu font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload an image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={handleImageChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs font-Ubuntu text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowSlideOver(false)}
                          className="px-4 py-2 border text-sm font-Ubuntu rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className={`bg-blue-500 text-white px-4 py-2 font-Ubuntu text-sm rounded-md ${
                            submitting
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-blue-600"
                          }`}
                        >
                          {submitting ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalsManagement;
