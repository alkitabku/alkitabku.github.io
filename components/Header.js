import React from "react";
import Navbar from '@/components/Navbar'

export default function Header(props) {
    return (
        <>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{ props.title }</title>
        <Navbar title={ props.title }></Navbar>
        </>
    );
}
