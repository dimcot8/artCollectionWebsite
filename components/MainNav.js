import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useRouter} from 'next/router';
import {useState} from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from 'jotai';
import {searchHistoryAtom} from '../store';

export default function MainNav() {
   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

   const router = useRouter()

   const [route, setRoute] = useState()
   const [isExpanded, setExpanded] = useState(false);


   const handleSubmit = (e) => {
       e.preventDefault()
       setExpanded(false);
       setSearchHistory(current => [...current, route]);
       router.push(`/artwork?title=true&q=${route}`)
   }

   const  toggle =(e) => {
      e.preventDefault();

      console.log("TOGGLE TRIGGERED...")
      setExpanded(prevExpanded => !prevExpanded)
  }

  const  toggleLink= (e)=> {
   e.preventDefault();

   console.log("TOGGLE TRIGGERED...")
   setExpanded(!isExpanded)
}

    return (
     <>
      <Navbar className="fixed-top navbar-dark bg-dark" bg="light" expand="lg" 
      expanded={isExpanded}>
         <Container>
            <Navbar.Brand>Dmytro Benko</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" 
            onToggle={toggle}/>
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">

               <Nav.Link href="/" passHref  >Home</Nav.Link>
                 <Nav.Link href="/search" passHref  >Advanced Search</Nav.Link>


               </Nav>
                &nbsp;
               <Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => {setRoute(e.target.value)}}
                    />
                    <Button type="submit" variant="success">Search</Button>
                </Form>
                <Nav>
                <NavDropdown title="User Name" id="basic-nav-dropdown">
             <NavDropdown.Item onClick={toggleLink}> <Link href="/favourites" passHref >Favourites </Link></NavDropdown.Item>
             <NavDropdown.Item onClick={toggleLink}> <Link href="/history" passHref >Search history </Link></NavDropdown.Item>

            </NavDropdown>
            </Nav>
                &nbsp;
            </Navbar.Collapse>
            
         </Container>
      </Navbar>
      <br />
      <br />
     </>
    )
  }
  