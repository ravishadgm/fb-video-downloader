"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MediaPreview from "@/components/mediaPreview/MediaPreview";
import styles from "./style.module.scss";
import { mainNavLinks } from "@/dataStore/linksContent";
import { downloadFacebookMedia } from "@/utils/api";
import { FaPaste, FaTimes } from "@/icons/index";

export default function Downloader({
  title = "Facebook Downloader",
  subtitle = "Download Facebook Videos, Photos, Reels & story",
}) {
  const [url, setUrl] = useState("https://www.facebook.com/reel/1457451568709586/?referral_source=profile_reels_tab");
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pageMeta, setPageMeta] = useState({
    title,
    description: subtitle,
  });

  const pathname = usePathname();

  useEffect(() => {
    if (pageMeta.title) {
      document.title = pageMeta.title;
    }
    if (pageMeta.description) {
      let metaDescriptionTag = document.querySelector(
        'meta[name="description"]'
      );
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement("meta");
        metaDescriptionTag.setAttribute("name", "description");
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute("content", pageMeta.description);
    }
  }, [pageMeta]);

  // ✅ Handle form submit
  const handleDownload = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");
    setMediaData(null);

    try {
      const data = await downloadFacebookMedia(url);
      console.log(data,"data")
      setMediaData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      if (!navigator.clipboard) {
        alert("Clipboard not supported. Please paste manually (Ctrl+V).");
        return;
      }
      const text = await navigator.clipboard.readText();
      setUrl(text.trim());
    } catch {
      alert("Paste manually using Ctrl+V (or ⌘+V on Mac).");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        {/* Navigation Tabs */}
        <nav className={styles.category}>
          {mainNavLinks?.map(
            ({ label, icon, href, metaTitle, metaDescription }, idx) => {
              const isActive = pathname === href;
              return (
                <div
                  className={`${styles.category_element} ${
                    isActive ? styles.active : ""
                  }`}
                  key={idx}
                >
                  <Link
                    href={href}
                    onClick={() =>
                      setPageMeta({
                        title: metaTitle || label,
                        description: metaDescription || "",
                      })
                    }
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                </div>
              );
            }
          )}
        </nav>

        {/* Page Title */}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        {/* Search Form */}
        <form className={styles.search_form} onSubmit={handleDownload}>
          <div className={styles.search_form__field}>
            <label className={styles.search_form__label}>
              <input
                type="text"
                placeholder="Insert Facebook link here"
                className={styles.search_form__input}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                required
              />
            </label>

            {/* Paste / Clear Button */}
            <div className={styles.search_form__clipboard}>
              {url.trim() === "" ? (
                <button
                  type="button"
                  disabled={loading}
                  className={styles.search_form__clipboard_paste}
                  onClick={handlePaste}
                >
                  <FaPaste />
                  Paste
                </button>
              ) : (
                <button
                  type="button"
                  disabled={loading}
                  className={styles.search_form__clipboard_clear}
                  onClick={() => setUrl("")}
                >
                  <FaTimes />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={styles.search_form__button}
          >
            {loading ? "Fetching..." : "Download"}
          </button>
        </form>

        {/* Error Message */}
        {error && <div className={styles.error}>{error}</div>}
      </div>

      {/* Loader */}
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner} />
          <p className={styles.loaderMessage}>
            Fetching Facebook media, please wait...
          </p>
        </div>
      ) : (
        mediaData && <MediaPreview mediaData={mediaData} />
      )}
    </>
  );
}
