import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem,
} from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Home, MidnightsUser, MidnightsPoints,
  MidnightsWeek, MidnightsAdminDashboard, MidnightsAdminAccounts,
  MidnightsAdminCreateOne, MidnightsAdminReview, MidnightsAdminTasks,
  MidnightsAdminCreateTask, MarketHome, WorkweekHome, WorkweekTickets, WorkweekAdmin
} from './scenes';
import {
  home_path, market_home, midnights_admin_accounts, midnights_admin_create_task, midnights_admin_home,
    midnights_admin_tasks, market_home, home_path, midnights_admin_new_midnight, midnights_admin_review,
    midnights_points_path, midnights_user_path, midnights_week_path, workweek_admin, workweek_home, workweek_software,
} from 'paths';


class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/prototype/">
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                ZBTodo
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <IndexLinkContainer to={home_path}>
                  <NavItem eventKey={1}>Home</NavItem>
                </IndexLinkContainer>
                <LinkContainer to={market_home}>
                  <NavItem eventKey={3}>Market</NavItem>
                </LinkContainer>
                <NavDropdown eventKey={4} title="Workweek" id="workweekDropdown">
                  <IndexLinkContainer to={workweek_home}>
                    <NavItem eventKey={4.1}>Workweek Home</NavItem>
                  </IndexLinkContainer>
                  <LinkContainer to={workweek_software}>
                    <MenuItem eventKey={4.1}>Software Development</MenuItem>
                  </LinkContainer>
                  <LinkContainer to={workweek_admin}>
                    <MenuItem eventKey={4.2}>Workweek Chair</MenuItem>
                  </LinkContainer>
                </NavDropdown>
                <NavDropdown eventKey={2} title="Midnights" id="midnightsDropdown">
                  <LinkContainer to={midnights_week_path}>
                    <MenuItem eventKey={2.1}>Midnight Assignments</MenuItem>
                  </LinkContainer>
                  <LinkContainer to={midnights_points_path}>
                    <MenuItem eventKey={2.2}>Midnight Points</MenuItem>
                  </LinkContainer>
                  <LinkContainer to={midnights_user_path}>
                    <MenuItem eventKey={2.3}>My Midnights</MenuItem>
                  </LinkContainer>
                  <LinkContainer to={midnights_admin_home}>
                    <MenuItem eventKey={2.4}>Midnights Admin</MenuItem>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="container-fluid">
            <Route exact path={home_path} component={Home}/>
            <Route path={midnights_user_path} component={MidnightsUser}/>
            <Route path={midnights_week_path} component={MidnightsWeek}/>
            <Route path={midnights_points_path} component={MidnightsPoints}/>
            <Route exact path={midnights_admin_home} component={MidnightsAdminDashboard}/>
            <Route path={midnights_admin_accounts} component={MidnightsAdminAccounts}/>
            <Route path={midnights_admin_new_midnight} component={MidnightsAdminCreateOne}/>
            <Route path={midnights_admin_review} component={MidnightsAdminReview}/>
            <Route path={midnights_admin_tasks} component={MidnightsAdminTasks}/>
            <Route path={midnights_admin_create_task} component={MidnightsAdminCreateTask}/>
            <Route exact path={market_home} component={MarketHome}/>
            <Route exact path={workweek_home} component={ WorkweekHome }/>
            <Route path={workweek_software} component={ WorkweekTickets }/>
            <Route path={workweek_admin} component={ WorkweekAdmin }/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
