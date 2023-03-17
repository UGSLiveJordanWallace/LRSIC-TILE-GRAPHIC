import React, { useEffect, useRef, useState } from 'react'
import Input from '../../components/Input'
import MenuSelect, { MenuOption } from '../../components/MenuSelect'
import PocketBase from 'pocketbase'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

export default function EditPage() {
  const searchRef = useRef();

  const [pavers, setPavers] = useState([]);
  const [tableRender, setTableRender] = useState([]);
  const [paverEdits, setPaverEdits] = useState([]);

  const db = new PocketBase('http://127.0.0.1:8090');
  const router = useRouter();

  useEffect(() => {
    async function getPavers() {
      const records = await db.collection('tiles').getFullList({
        sort: '+row',
        '$autoCancel': false
      })
      setPavers(records);
      setTableRender(records);
    }
    
    const cookie = Cookies.get('auth');
    if (!cookie) {
      if (router) {
        router.push('/login');
      }
    } else {
      const auth = JSON.parse(cookie);
      if (!auth.tileEditor) {
        router.push('/login');
      }
    }
    
    getPavers();
  }, [])

  async function handleSearch(e) {
    e.preventDefault();

    const value = searchRef.current.value;
    console.log(value.toLocaleLowerCase());

    const result = [];
    pavers.map(paver => {
      if (paver.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())) {
        result.push(paver);
      }
    })
    setTableRender(result);
  }

  async function handlePaverEdits(e) {
    e.preventDefault();

    console.log(paverEdits)
  }
  
  return (
    <div>
      <button style={{position: "fixed", bottom: "10px", right: "10px"}} onClick={handlePaverEdits}>Upload</button>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Row</td>
            <td>Column</td>
            <td>Block</td>
            <td>Section</td>
            <td>Donor First Name</td>
            <td>Donor Last Name</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={"8"}><Input type="text" ref={searchRef} style={{width: "100%"}}/></td>
            <td><button onClick={handleSearch}>Find Paver</button></td>
          </tr>
          {tableRender && tableRender.map((value) => {
            return <tr>
              <td><Input type="text" placeholder={value.name} onChange={e => {
                value.name = e.target.value;

                const checkIfInEditQueue = paverEdits.some(e => {
                  return JSON.stringify(e) === JSON.stringify(value);
                })
                if (checkIfInEditQueue) {
                  return;
                }

                setPaverEdits([...paverEdits, value]);
              }}/></td>
              <td><Input type="text" placeholder={value.description} onChange={e => {
                value.description = e.target.value;

                const checkIfInEditQueue = paverEdits.some(e => {
                  return JSON.stringify(e) === JSON.stringify(value);
                })
                if (checkIfInEditQueue) {
                  return;
                }

                setPaverEdits([...paverEdits, value]);
              }}/></td>
              <td><Input type="number" min={1} max={40} placeholder={value.row} onChange={e => {
                value.row = e.target.value;
                
                const checkIfInEditQueue = paverEdits.some(e => {
                  return JSON.stringify(e) === JSON.stringify(value);
                })
                if (checkIfInEditQueue) {
                  return;
                }

                setPaverEdits([...paverEdits, value]);
              }}/></td>
              <td><Input type="number" min={1} max={60} placeholder={value.col} onChange={e => {
                value.col = e.target.value;

                const checkIfInEditQueue = paverEdits.some(e => {
                  return JSON.stringify(e) === JSON.stringify(value);
                })
                if (checkIfInEditQueue) {
                  return;
                }

                setPaverEdits([...paverEdits, value]);
              }}/></td>
              <td><Input type="text" placeholder={value.block} style={{width: "100%"}} onChange={e => {
                value.block = e.target.value;

                const checkIfInEditQueue = paverEdits.some(e => {
                  return JSON.stringify(e) === JSON.stringify(value);
                })
                if (checkIfInEditQueue) {
                  return;
                }

                setPaverEdits([...paverEdits, value]);
              }}/></td>
              <td><Input text="text" placeholder={value.section} style={{width: "100%"}} onChange={e => {
                value.section = e.target.value;

                const checkIfInEditQueue = paverEdits.some(e => {
                  return JSON.stringify(e) === JSON.stringify(value);
                })
                if (checkIfInEditQueue) {
                  return;
                }

                setPaverEdits([...paverEdits, value]);
              }}/></td>
              <td><Input type="text" placeholder={value.donor_firstname} onChange={e => {
                value.donor_firstname = e.target.value;

                const checkIfInEditQueue = paverEdits.some(e => {
                  return JSON.stringify(e) === JSON.stringify(value);
                })
                if (checkIfInEditQueue) {
                  return;
                }

                setPaverEdits([...paverEdits, value]);
              }}/></td>
              <td><Input type="text" placeholder={value.donor_lastname} onChange={e => {
                value.donor_lastname = e.target.value;

                const checkIfInEditQueue = paverEdits.some(e => {
                  return JSON.stringify(e) === JSON.stringify(value);
                })
                if (checkIfInEditQueue) {
                  return;
                }

                setPaverEdits([...paverEdits, value]);
              }}/></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}
