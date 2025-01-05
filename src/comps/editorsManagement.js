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

const EditorsManagement = () => {
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSlideOver, setShowSlideOver] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    imageUrl: "",
  });
  const [editingEditor, setEditingEditor] = useState(null);

  // Pagination states
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 6;

  const storage = getStorage();
  const db = getFirestore();
  const editorsRef = collection(db, "editors");

  // Fetch editors with pagination
  const fetchEditors = async (isInitial = false) => {
    try {
      let q;
      if (isInitial) {
        q = query(editorsRef, orderBy("name"), limit(ITEMS_PER_PAGE));
      } else {
        if (!lastVisible) return;
        q = query(
          editorsRef,
          orderBy("name"),
          startAfter(lastVisible),
          limit(ITEMS_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(q);
      const editorsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHasMore(querySnapshot.docs.length === ITEMS_PER_PAGE);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      if (isInitial) {
        setEditors(editorsData);
      } else {
        setEditors((prev) => [...prev, ...editorsData]);
      }
    } catch (error) {
      enqueueSnackbar("Error fetching editors", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditors(true);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = formData.imageUrl;

      if (selectedImage) {
        const storageRef = ref(
          storage,
          `editors/${selectedImage.name}-${Date.now()}`
        );
        await uploadBytes(storageRef, selectedImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      const editorData = {
        name: formData.name,
        about: formData.about,
        imageUrl,
      };

      if (editingEditor) {
        await updateDoc(doc(db, "editors", editingEditor.id), editorData);
        enqueueSnackbar("Editor updated successfully!", { variant: "success" });
      } else {
        await addDoc(editorsRef, editorData);
        enqueueSnackbar("Editor added successfully!", { variant: "success" });
      }

      resetForm();
      fetchEditors(true);
    } catch (error) {
      enqueueSnackbar("Error saving editor", { variant: "error" });
    } finally {
      setSubmitting(false);
      setShowSlideOver(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", about: "", imageUrl: "" });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingEditor(null);
  };

  const handleDelete = async (editorId) => {
    if (window.confirm("Are you sure you want to delete this editor?")) {
      try {
        await deleteDoc(doc(db, "editors", editorId));
        enqueueSnackbar("Editor deleted successfully!", { variant: "success" });
        fetchEditors(true);
      } catch (error) {
        enqueueSnackbar("Error deleting editor", { variant: "error" });
      }
    }
  };

  const handleEdit = (editor) => {
    setEditingEditor(editor);
    setFormData({
      name: editor.name,
      about: editor.about,
      imageUrl: editor.imageUrl,
    });
    setImagePreview(editor.imageUrl);
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
          <h2 className="text-2xl font-medium font-Ubuntu">Editors</h2>
          <button
            onClick={() => {
              resetForm();
              setShowSlideOver(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 text-sm font-Ubuntu rounded-md hover:bg-blue-600"
          >
            Add Editor
          </button>
        </div>

        {/* Empty State */}
        {editors.length === 0 ? (
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-Ubuntu font-medium text-gray-900">
              No editors
            </h3>
            <p className="mt-1 text-sm font-Archivo text-gray-500">
              Get started by creating a new editor.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowSlideOver(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-Ubuntu text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                Add Editor
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Editors Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {editors.map((editor) => (
                <div
                  key={editor.id}
                  className="bg-white rounded-lg border border-[#979797]"
                >
                  <img
                    src={editor.imageUrl}
                    alt={editor.name}
                    className="w-full h-56 object-cover rounded-md mb-4"
                  />
                  <div className=" p-4">
                    <h3 className="font-semibold text-lg font-Archivo">
                      {editor.name}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm font-Ubuntu">
                      {editor.about}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(editor)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-Archivo hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(editor.id)}
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
                  onClick={() => fetchEditors(false)}
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
                        {editingEditor ? "Edit Editor" : "Add New Editor"}
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
                          About
                        </label>
                        <textarea
                          className="mt-1 w-full px-4 py-2 border rounded-md"
                          value={formData.about}
                          onChange={(e) =>
                            setFormData({ ...formData, about: e.target.value })
                          }
                          required
                          rows={4}
                        />
                      </div>

                      <div>
                        <label className="block font-Ubuntu text-sm font-medium text-gray-700">
                          Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            {imagePreview ? (
                              <div className="mb-4">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="mx-auto h-32 w-32 object-cover rounded-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedImage(null);
                                    setImagePreview(null);
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
                                <span>Upload a file</span>
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
                              PNG, JPG, GIF up to 10MB
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

export default EditorsManagement;
