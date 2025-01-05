import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useSnackbar } from "notistack";
import Skeleton from "react-loading-skeleton";

const GeneralSettings = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    about: "",
    mission: "",
    target: "",
    instagram: "",
    twitter: "",
    whatsapp: "",
    linkedin: "",
    address: "",
    youtubeChannel: "",
    websiteUrl: "",
  });

  const db = getFirestore();
  const settingsRef = doc(db, "settings", "general");

  // Fetch current settings
  // In the fetchSettings function of GeneralSettings
  const fetchSettings = async () => {
    try {
      const docSnap = await getDoc(settingsRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        // If document doesn't exist, create it with empty values
        await setDoc(settingsRef, formData);
      }
    } catch (error) {
      enqueueSnackbar("Error fetching settings", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      enqueueSnackbar("Please enter a valid email address", {
        variant: "error",
      });
      return false;
    }

    // Phone validation (optional but must be valid if provided)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      enqueueSnackbar("Please enter a valid phone number", {
        variant: "error",
      });
      return false;
    }

    // URL validations
    const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    const socialHandleRegex = /^@?[\w\d_.]{1,}$/;

    if (formData.websiteUrl && !urlRegex.test(formData.websiteUrl)) {
      enqueueSnackbar("Please enter a valid website URL", { variant: "error" });
      return false;
    }

    if (formData.instagram && !socialHandleRegex.test(formData.instagram)) {
      enqueueSnackbar("Please enter a valid Instagram handle", {
        variant: "error",
      });
      return false;
    }

    if (formData.twitter && !socialHandleRegex.test(formData.twitter)) {
      enqueueSnackbar("Please enter a valid Twitter handle", {
        variant: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await updateDoc(settingsRef, formData);
      enqueueSnackbar("Settings updated successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error updating settings", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Skeleton count={10} height={40} className="mb-4" />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-medium font-Ubuntu mb-6">
        General Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium font-Archivo mb-4">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border rounded-md"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                className="mt-1 w-full px-4 py-2 border rounded-md"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                Address
              </label>
              <textarea
                className="mt-1 w-full px-4 py-2 border rounded-md"
                rows={3}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Organization Information Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium font-Archivo mb-4">
            Organization Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                About
              </label>
              <textarea
                className="mt-1 w-full px-4 py-2 border rounded-md"
                rows={4}
                value={formData.about}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                Mission Statement
              </label>
              <textarea
                className="mt-1 w-full px-4 py-2 border rounded-md"
                rows={4}
                value={formData.mission}
                onChange={(e) =>
                  setFormData({ ...formData, mission: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                Our Target
              </label>
              <textarea
                className="mt-1 w-full px-4 py-2 border rounded-md"
                rows={4}
                value={formData.target}
                onChange={(e) =>
                  setFormData({ ...formData, target: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                Website URL
              </label>
              <input
                type="url"
                className="mt-1 w-full px-4 py-2 border rounded-md"
                value={formData.websiteUrl}
                onChange={(e) =>
                  setFormData({ ...formData, websiteUrl: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium font-Archivo mb-4">
            Social Media
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                Instagram Handle
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">@</span>
                </div>
                <input
                  type="text"
                  className="pl-7 w-full px-4 py-2 border rounded-md"
                  value={formData.instagram}
                  onChange={(e) =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                Twitter Handle
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">@</span>
                </div>
                <input
                  type="text"
                  className="pl-7 w-full px-4 py-2 border rounded-md"
                  value={formData.twitter}
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                WhatsApp Number
              </label>
              <input
                type="tel"
                className="mt-1 w-full px-4 py-2 border rounded-md"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                LinkedIn URL
              </label>
              <input
                type="url"
                className="mt-1 w-full px-4 py-2 border rounded-md"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-Ubuntu text-gray-700">
                YouTube Channel
              </label>
              <input
                type="url"
                className="mt-1 w-full px-4 py-2 border rounded-md"
                value={formData.youtubeChannel}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeChannel: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`bg-blue-500 text-white px-6 py-2 rounded-md font-Ubuntu ${
              submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
