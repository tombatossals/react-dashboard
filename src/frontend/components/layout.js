import React from 'react';
import SidebarToggle from 'components/Sidebar/SidebarToggle';
import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/content';

function Layout(props) {
  let sections = [
    {
      name: 'Your Apps',
      icon: 'blank-app-outline',
      link: '/dashboard',
    },
  ];

  return (
    <div>
      <Content>{props.children}</Content>
      <Sidebar
        sections={sections}
        section="Your Apps"
      />
      <SidebarToggle />
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.any,
};

export default Layout;
