import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: `WebSeva`,
  description: "WebSeva is a platform where you can find open-source project's to contribute and win exciting rewards",
};

export default function RootLayout({ children }) {
  return (

  
     
        <html lang="en">
           <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="icon" href="/WebSeva.png" />
           </head>
          <body className={`${inter.className} dark`}>{children}</body>
        </html>

   
  );
}
