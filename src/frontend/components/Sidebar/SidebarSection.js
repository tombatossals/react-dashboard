import Icon from 'components/Icon/Icon';
import { Link } from 'react-router';
import React from 'react';
import styles from 'components/Sidebar/Sidebar.scss';

const SidebarSection = ({ active, children, name, link, icon }) => {
  const classes = [styles.section];
  if (active) {
    classes.push(styles.active);
  }
  let iconContent = null;
  if (icon) {
    iconContent = <Icon width={25} height={25} name={icon} fill="#ffffff" />;
  }
  return (
    <div className={classes.join(' ')}>
      {active ?
        <div className={styles.section_header}>{iconContent}{name}</div> :
        <Link
          className={styles.section_header}
          to={{ pathname: link || '' }}
        >
          {iconContent}{name}
        </Link>
      }

      {children ? <div className={styles.section_contents}>{children}</div> : null}
    </div>
  );
};

SidebarSection.propTypes = {
  active: React.PropTypes.bool,
  name: React.PropTypes.string,
  link: React.PropTypes.string,
  children: React.PropTypes.any,
  icon: React.PropTypes.string,
};

export default SidebarSection;
