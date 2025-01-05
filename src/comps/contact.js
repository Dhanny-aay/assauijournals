import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import spo from "../image/spo.png";
import spon from "../image/spon.png";
import sor from "../image/sor.png";
import { useGeneral } from "../contexts/generalContext";

const Contact = () => {
  const { generalInfo, loading: generalLoading } = useGeneral();

  // Only create cards for items that exist in generalInfo
  const contactCards = !generalLoading
    ? [
        generalInfo?.phone && {
          icon: <Phone className="w-6 h-6" />,
          title: "Phone",
          content: generalInfo.phone,
          link: `tel:${generalInfo.phone}`,
        },
        generalInfo?.email && {
          icon: <Mail className="w-6 h-6" />,
          title: "Email",
          content: generalInfo.email,
          link: `mailto:${generalInfo.email}`,
        },
        generalInfo?.address && {
          icon: <MapPin className="w-6 h-6" />,
          title: "Address",
          content: generalInfo.address,
        },
        generalInfo?.websiteUrl && {
          icon: <Globe className="w-6 h-6" />,
          title: "Website",
          content: "Visit our website",
          link: generalInfo.websiteUrl,
        },
      ].filter(Boolean)
    : []; // Remove null items

  // Only create social links for items that exist in generalInfo
  const socialLinks = !generalLoading
    ? [
        generalInfo?.twitter && {
          icon: <Twitter className="w-5 h-5" />,
          link: `https://twitter.com/${generalInfo.twitter}`,
          label: "Twitter",
        },
        generalInfo?.instagram && {
          icon: <Instagram className="w-5 h-5" />,
          link: `https://instagram.com/${generalInfo.instagram}`,
          label: "Instagram",
        },
        generalInfo?.linkedin && {
          icon: <Linkedin className="w-5 h-5" />,
          link: generalInfo.linkedin,
          label: "LinkedIn",
        },
        generalInfo?.youtubeChannel && {
          icon: <Youtube className="w-5 h-5" />,
          link: generalInfo.youtubeChannel,
          label: "YouTube",
        },
        generalInfo?.whatsapp && {
          icon: <MessageCircle className="w-5 h-5" />,
          link: `https://wa.me/${generalInfo.whatsapp.replace("+", "")}`,
          label: "WhatsApp",
        },
      ].filter(Boolean)
    : []; // Remove null items

  return (
    <div className="w-full px-5 md:px-10 lg:px-20 pb-20">
      <h2 className="font-medium font-Ubuntu text-2xl md:text-3xl text-center text-[#121212] mb-12">
        Contact Us
      </h2>

      {/* Main Contact Cards */}
      {(generalLoading || contactCards.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {generalLoading
            ? // Loading skeleton for contact cards
              [...Array(4)].map((_, index) => (
                <div key={index} className="p-6">
                  <Skeleton height={48} className="mb-4" />
                  <Skeleton height={20} width={100} className="mb-2" />
                  <Skeleton height={16} width={150} />
                </div>
              ))
            : contactCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      {card.icon}
                    </div>
                    <h3 className="font-Ubuntu font-medium text-lg mb-2">
                      {card.title}
                    </h3>
                    {card.link ? (
                      <a
                        href={card.link}
                        className="text-blue-600 hover:text-blue-700 font-Ubuntu"
                        target={card.title === "Website" ? "_blank" : undefined}
                        rel={
                          card.title === "Website"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {card.content}
                      </a>
                    ) : (
                      <p className="text-gray-600 font-Ubuntu">
                        {card.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
        </div>
      )}

      {/* Social Media Links - Only show if there are social links or loading */}
      {(generalLoading || socialLinks.length > 0) && (
        <div className="flex flex-col items-center mb-16">
          <h3 className="text-xl font-Ubuntu font-medium mb-6">
            Connect With Us
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {generalLoading
              ? // Loading skeleton for social links
                [...Array(5)].map((_, index) => (
                  <Skeleton key={index} circle width={40} height={40} />
                ))
              : socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
          </div>
        </div>
      )}

      {/* Sponsors Section */}
      <div className="w-full">
        <p className="font-Ubuntu font-medium text-2xl text-center md:text-3xl my-10 text-[#121212]">
          Our Sponsors
        </p>
        <div className="flex w-full md:flex-row flex-col items-center space-y-10 md:space-y-0 justify-between">
          <img src={spo} className="w-[150px]" alt="Sponsor 1" />
          <img src={spon} className="w-[150px]" alt="Sponsor 2" />
          <img src={sor} className="w-[150px]" alt="Sponsor 3" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
