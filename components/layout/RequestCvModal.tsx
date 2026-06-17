"use client";

import { FormEvent, useCallback, useEffect, useId, useState } from "react";
import { isWorkEmail, WORK_EMAIL_ERROR } from "@/lib/workEmail";
import styles from "./RequestCvModal.module.css";

type RequestCvModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function RequestCvModal({ isOpen, onClose }: RequestCvModalProps) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = useCallback(() => {
    setName("");
    setCompany("");
    setEmail("");
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    resetForm();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleClose, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedCompany = company.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedCompany || !trimmedEmail) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!isWorkEmail(trimmedEmail)) {
      setStatus("error");
      setErrorMessage(WORK_EMAIL_ERROR);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/request-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          company: trimmedCompany,
          email: trimmedEmail,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>

        {status === "success" ? (
          <div className={styles.success}>
            <h2 id={titleId} className={styles.title}>
              Request sent
            </h2>
            <p className={styles.description}>
              Thanks — I&apos;ll get back to you shortly.
            </p>
            <button type="button" className={styles.submitButton} onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId} className={styles.title}>
              Request a CV
            </h2>
            <p className={styles.description}>
              Share your details and I&apos;ll send my CV over.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label className={styles.field}>
                <span className={styles.label}>Name</span>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={status === "submitting"}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Company</span>
                <input
                  className={styles.input}
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  disabled={status === "submitting"}
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Work email</span>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={status === "submitting"}
                  required
                />
              </label>

              {errorMessage ? (
                <p className={styles.error} role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
