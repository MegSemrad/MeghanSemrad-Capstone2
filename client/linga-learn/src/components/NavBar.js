import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink, Redirect } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { UserContext } from "../providers/UserProvider";

export default function NavBar() {
    const { isLoggedIn, logout } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (

        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">LingaLearn</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>

                        <UncontrolledDropdown nav inNavbar>

                            <DropdownToggle nav>
                                Study Time
                            </DropdownToggle>

                            <DropdownMenu right>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Flashcards
                                    </DropdownToggle>

                                    <DropdownMenu>
                                        <DropdownItem href="/FlashcardCollectionList">
                                            Study
                                            </DropdownItem>
                                        <DropdownItem>
                                            Add
                                            </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </DropdownMenu>

                        </UncontrolledDropdown>

                        <NavItem>
                            <NavLink href="/resources/">Resources</NavLink>
                        </NavItem>

                    </Nav>

                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <Redirect to="/login" />
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}