import React, { useEffect } from "react"
import AccountService from '../services/account.service';
import { navigate } from 'gatsby';

function IndexPage() {
  useEffect(() => {
    if (AccountService.isCreated()) {
      navigate('/menu');

      return;
    }

    navigate('/quiz');
  }, [])

  return <></>
}

export default IndexPage
