import React from 'react';
import SidebarToggle from 'components/Sidebar/SidebarToggle';
import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/content';

function Layout(props) {
  let sections = [
    {
      name: 'david.rubert@gmail.com',
      icon: 'blank-app-outline',
      link: '/dashboard/user',
    },
  ];

  return (
    <div>
      <Content>{props.children}</Content>
      <Sidebar
        sections={sections}
        section=""
        prefix=""
      />
      <SidebarToggle />
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.node,
};

export default Layout;
