/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import AppsSelector from 'components/Sidebar/AppsSelector';
import React from 'react';
import SidebarHeader from 'components/Sidebar/SidebarHeader';
import SidebarSection from 'components/Sidebar/SidebarSection';
import SidebarSubItem from 'components/Sidebar/SidebarSubItem';
import styles from 'components/Sidebar/Sidebar.scss';

const Sidebar = ({
  prefix,
  action,
  actionHandler,
  children,
  subsection,
  sections,
  section,
  appSelector,
}) => {
  const submenu = subsections => {
    if (!subsections) {
      return null;
    }
    return (
      <div className={styles.submenu}>
        {subsections.map(({ name, link }) => {
          const active = subsection === name;
          return (
            <SidebarSubItem
              key={name}
              name={name}
              link={prefix + link}
              action={action || null}
              actionHandler={active ? actionHandler : null}
              active={active}
            >
              {active ? children : null}
            </SidebarSubItem>
          );
        })}
      </div>
    );
  };

  const apps = [1, 2, 3];

  return (
    <div className={styles.sidebar}>
      <SidebarHeader />
      {appSelector ? <AppsSelector apps={apps} /> : null}

      <div className={styles.content}>
        {sections.map(({
          name,
          icon,
          style,
          link,
          subsections,
        }) => {
          const active = name === section;
          return (
            <SidebarSection
              key={name}
              name={name}
              icon={icon}
              style={style}
              link={prefix + link}
              active={active}
            >
              {active ? submenu(subsections) : null}
            </SidebarSection>
          );
        })}
      </div>
      <div className={styles.footer}>
        <a href="/logout">Homepage</a>
      </div>
    </div>
  );
};

Sidebar.contextTypes = {
  generatePath: React.PropTypes.func,
};

export default Sidebar;
