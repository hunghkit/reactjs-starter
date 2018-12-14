import { withRouter } from 'next/router';
import { Menu } from 'antd';

const ActiveMenu = ({ children, router, href, ...props }) => {
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black'
  }

  const handleClick = (e) => {
    e.preventDefault()
    href && router.push(href);
  }

  return (
    <Menu.Item {...props}>
      <a 
        href={href} 
        style={style}
        onClick={handleClick} 
      >
        {children}
      </a>
    </Menu.Item>
  )
}

export default withRouter(ActiveMenu)
