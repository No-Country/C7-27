import { Link as MUILink } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>APP</h1>
      <Link href="/auth/login">
        <MUILink>login</MUILink>
      </Link>
      <br />
      <Link href="/auth/register">
        <MUILink>register</MUILink>
      </Link>
    </div>
  );
}
