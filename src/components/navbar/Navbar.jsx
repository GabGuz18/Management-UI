import React from 'react'
import {
  HeaderContainer,
	Header,
	SkipToContent,
	HeaderMenuButton,
	HeaderName,
	SideNav,
	SideNavItems,
	SideNavLink,
	Theme
} from '@carbon/react';
import { Link } from 'react-router-dom';
import { Receipt, Wallet, ChartCustom } from '@carbon/icons-react'

export const Navbar = () => {
  return (
    <Theme theme='g90'>
			<HeaderContainer
				render={({ isSideNavExpanded, onClickSideNavExpand }) => (
					<>
						<Header aria-label="Cafe del centro">
							<SkipToContent />
							<HeaderMenuButton
								aria-label='Open Menu'
								onClick={onClickSideNavExpand}
								isActive={isSideNavExpanded}
							/>
							<HeaderName prefix="">
								Cafe del Centro
							</HeaderName>
							<SideNav
								aria-label='Side Navigation'
								expanded={isSideNavExpanded}
							>
								<SideNavItems>
									<SideNavLink
										renderIcon={Receipt}
										element={Link}
										to="/sales"
									>
										Sales
									</SideNavLink>
									<SideNavLink
										renderIcon={Wallet}
										element={Link}
										to="/purchase"
									>
										Purchase
									</SideNavLink>
									<SideNavLink
										renderIcon={ChartCustom}
										element={Link}
										to="/admin"
									>
										Admin
									</SideNavLink>
								</SideNavItems>
							</SideNav>
						</Header>
					</>
				)}
			/>
		</Theme>
  )
}
