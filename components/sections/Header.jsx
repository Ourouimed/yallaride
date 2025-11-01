'use client';
import Image from "next/image";
import { Button } from "../ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Header(){
    const links = [
        {
            path : '/' ,
            name : 'Home'
        },
        {
            path : '/book' ,
            name : 'Book a ride'
        },
        {
            path : '/about' ,
            name : 'About us'
        },
        {
            path : '/contact' ,
            name : 'Contact us'
        }
    ]
    const {theme , toggleTheme } = useTheme()
    return <header className="flex fixed top-0 w-full items-center justify-between z-10 bg-background px-20 py-5 border-b border-border">
        <div>
            <Image className='dark:hidden' src='/assets/logo-light.svg' alt="logo" height={35} width={125}></Image>
            <Image className='hidden dark:block' src='/assets/logo-dark.svg' alt="logo" height={35} width={125}></Image>
        </div>

        <div className="flex items-center justify-between gap-5">
            <nav>
                <ul className="flex items-center">
                    {links.map(({path , name})=> <li key={name}>
                        <a href={path} className="inline-flex px-3 transition duration-300 hover:text-mainColor">{name}</a>
                    </li>)}
                </ul>
            </nav>

            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun/> : <Moon/>}
                </Button>
                <Button href="/login">Get started</Button>
            </div>
        </div>

        
            
    </header>
}