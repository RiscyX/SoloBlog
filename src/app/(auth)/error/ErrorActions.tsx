'use client';
import React from 'react'
import Link from 'next/link';

export default function ErrorActions({from}: {from?: string}) {

  const style = "underline text-purple-400 hover:text-purple-300";
  return (
    // Link is better than anchor tag for client-side navigation, because it prevents full page reloads
    <>
      {from === "signup" ? (
        <Link href="/signup" className={style}>
          Back to Sign Up
        </Link>
      ) : (
        <Link href="/login" className={style}>
          Back to Login
        </Link>
      )}
    </>
  );
}