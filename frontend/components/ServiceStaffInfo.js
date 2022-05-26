import React from "react";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Link from 'next/link';


export default function ServiceStaffInfo() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Link passHref href={"repairs/" + id}>
      <Button variant="text"
              style={{textTransform: 'none', 
                      color: '#ffffff', 
                      backgroundColor: "#2b2f40", 
                      fontSize: 14}} 
              disableRipple
              sx={{
                  textTransform: 'none', 
                  textColor: 'white',
                  marginTop: 3
                }}>
        Ремонтные работы {}
      </Button>
    </Link>
  )
}
