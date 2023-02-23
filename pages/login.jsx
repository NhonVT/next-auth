/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { getSession } from 'next-auth/react';

const login = () => {
    const { data: session } = useSession();
    console.log(session);
    console.log(session?.accessToken);

    if (session) {
        return (
            <>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
};

export default login;

