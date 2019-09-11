/*
Author: Connor Sanders
MIT License
React.js Web Client Boilerplate
9/01/2019
*/

import React from 'react';
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
    DropdownItem } from 'reactstrap';

export class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let userData = localStorage.getItem('user');
        let curPath = this.props.path;
        if (userData && curPath !== "/login" && curPath !== "/register") {
            let curUser = JSON.parse(userData);
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">The App</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/todos">Todos</NavLink>
                                </NavItem>
                                {(curUser.role === "master_admin" || curUser.role === "group_admin") &&
                                    <NavItem>
                                        <NavLink href="/admin">Admin</NavLink>
                                    </NavItem>}
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        { curUser.username }
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem href="/">Profile</DropdownItem>
                                        <DropdownItem href="/">Group</DropdownItem>
                                        <DropdownItem href="/">Account</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem href="/login">Logout</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        }
        return (
          <div>
              <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">The App</NavbarBrand>
              </Navbar>
          </div>
        );
    }
}