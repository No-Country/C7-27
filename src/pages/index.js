import { Link as MUILink } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>APP</h1>
      <Link href="/about">
        <MUILink>about</MUILink>
      </Link>
    </div>
  );
}
