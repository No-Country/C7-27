import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import LoginPage from "../../auth/login";
import { useSnackbar } from "notistack";

export default function VerifiedUser() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { id, token } = router.query;
  console.log(id);
  console.log(token);

  useEffect(() => {
    if (token && id) {
      (async () => {
        try {
          const url = `/api/users/${id}/verify/${token}`;
          const { data } = await axios.get(url);
          enqueueSnackbar(data, {
            variant: "success",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        } catch (e) {}
      })();
    }
  }, [token, id, enqueueSnackbar]);

  return (
    <div>
      <LoginPage />
    </div>
  );
}
