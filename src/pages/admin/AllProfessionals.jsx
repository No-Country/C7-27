import { Checkbox } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DashboardLayout } from "../../Layouts/dashboard/DashboardLayout";
import { changeActive } from "../../store/slices/user";

const gridStyle = {
  borderRadius: 2,
  border: "1px solid black",
  "& .MuiDataGrid-main": { borderRadius: 2 },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "& .MuiDataGrid-row": {
      "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" },
    },
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "rgba(0,0,255,0.6)",
    boder: "1px solid rgba(0,0,255,0.6)",
    color: "#fff",
    fontSize: 16,
    "& * ": {
      color: "#fff",
    },
  },
  "& .MuiDataGrid-columnSeparator": {
    visibility: "hidden",
  },
};

export default function AllProfessionals({ professionals }) {
  console.log(professionals);
  const dispatch = useDispatch();

  const [allProfessionals, setAllProfessional] = useState(professionals);

  const handleChangeActive = async (row) => {
    const professional = allProfessionals.filter((p) => p === row)[0];
    await dispatch(changeActive(professional));
    setAllProfessional(
      allProfessionals.map((p) =>
        p !== row ? p : { ...row, isActive: !p.isActive }
      )
    );
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      width: 150,
      renderCell: (params) => <>{params.row.firstName}</>,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      width: 150,
      renderCell: (params) => <>{params.row.lastName}</>,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      width: 150,
      renderCell: (params) => <>{params.row.email}</>,
    },
    {
      field: "speciality",
      headerName: "Speciality",
      flex: 1,
      width: 150,
      renderCell: (params) => <>{params.row.speciality}</>,
    },
    {
      field: "action",
      type: "action",
      sortable: false,
      menubar: false,
      headerName: "Active",
      filterable: false,
      width: 100,
      renderCell: (params) => (
        <>
          {
            <Checkbox
              checked={params.row.isActive}
              onClick={() => handleChangeActive(params.row)}
            />
          }
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      {professionals ? (
        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <DataGrid
            disableColumnSelector
            disableSelectionOnClick
            autoHeight
            columns={columns}
            rows={allProfessionals}
            pageSize={5}
            getRowId={(row) => row._id}
            sx={gridStyle}
          />
        </div>
      ) : null}
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `${rocess.env.NEXT_PUBLIC_VERCEL_URL}/api/professionals/allProfessionals`
  );
  const professionals = data.map((p) => p.professionalRef);

  return {
    props: {
      professionals,
    },
  };
}
