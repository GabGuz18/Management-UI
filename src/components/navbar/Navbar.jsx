import React, { useContext } from 'react'
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
import { Receipt, Wallet, ChartCustom, Money } from '@carbon/icons-react'
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {

	const context = useContext(AuthContext);

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
										renderIcon={Money}
										element={Link}
										to="/shift"
									>
										Shift
									</SideNavLink>
									{
										context.is_superuser && (
											<SideNavLink
												renderIcon={ChartCustom}
												element={Link}
												to="/admin"
											>
												Admin
											</SideNavLink>
										)
									}
								</SideNavItems>
							</SideNav>
						</Header>
					</>
				)}
			/>
		</Theme>
  )
}
