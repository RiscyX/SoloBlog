'use client';
import React from 'react'
import Link from 'next/link';

export default function ErrorActions({from}: {from?: string}) {
  return (
    // Link is better than anchor tag for client-side navigation, because it prevents full page reloads
    <>
      {from === "signup" ? (
        <Link href="/signup">Back to Sign Up</Link>
      ) : (
        <Link href="/login">Back to Login</Link>
      )}
    </>
  );
}