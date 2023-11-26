import {useState} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link} from '@inertiajs/react';
import NavDropdown from "@/Components/NavDropdown";
import Messages from "@/Components/Messages/Messages";

export default function Authenticated({auth, header, children, ...props}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
            <nav className="bg-white dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo
                                        className="block h-9 w-auto fill-current text-neutral-800 dark:text-neutral-200"/>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Inicio
                                </NavLink>
                                <NavDropdown
                                    title="Produtos"
                                    active={route().current('products.list') || route().current('products.new') || route().current('products.edit')}
                                >
                                    <Dropdown.Link href={route('products.list')}>Listar</Dropdown.Link>
                                    <Dropdown.Link href={route('products.new')}>Cadastrar</Dropdown.Link>
                                </NavDropdown>
                                <NavDropdown
                                    title="Compras"
                                    active={route().current('purchases.list') || route().current('purchases.new') || route().current('purchases.edit')}
                                >
                                    <Dropdown.Link href={route('purchases.list')}>Listar</Dropdown.Link>
                                    <Dropdown.Link href={route('purchases.new')}>Cadastrar</Dropdown.Link>
                                </NavDropdown>
                                <NavDropdown
                                    title="Vendas"
                                    active={route().current('sellings.list') || route().current('sellings.new') || route().current('sellings.edit')}
                                >
                                    <Dropdown.Link href={route('sellings.list')}>Listar</Dropdown.Link>
                                    <Dropdown.Link href={route('sellings.new')}>Cadastrar</Dropdown.Link>
                                </NavDropdown>
                                <NavDropdown
                                    title="Relatórios"
                                    active={route().current('report.sellings') || route().current('report.purchases') || route().current('report.earnings')}
                                >
                                    <Dropdown.Link href={route('report.sellings')}>Vendas</Dropdown.Link>
                                    <Dropdown.Link href={route('report.purchases')}>Compras</Dropdown.Link>
                                    <Dropdown.Link href={route('report.earnings')}>Faturamento</Dropdown.Link>
                                </NavDropdown>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Meu Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Sair
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 dark:text-neutral-500 hover:text-neutral-500 dark:hover:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 focus:text-neutral-500 dark:focus:text-neutral-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Inicio
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('products.list')} active={route().current('products.list')}>
                            Listar Produtos
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('products.new')} active={route().current('products.new')}>
                            Cadastrar Produto
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('purchases.list')} active={route().current('purchases.list')}>
                            Listar Compras
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('purchases.new')} active={route().current('purchases.new')}>
                            Cadastrar Compra
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('sellings.list')} active={route().current('sellings.list')}>
                            Listar Vendas
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('sellings.new')} active={route().current('sellings.new')}>
                            Cadastrar Venda
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('report.sellings')} active={route().current('report.sellings')}>
                            Relatório de Vendas
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('report.purchases')}
                                           active={route().current('report.purchases')}>
                            Relatório de Compras
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('report.earnings')} active={route().current('report.earnings')}>
                            Relatório de Faturamento
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-neutral-200 dark:border-neutral-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-neutral-800 dark:text-neutral-200">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-neutral-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Sair
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-neutral-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>
                <Messages {...props}/>
                {children}
            </main>
        </div>
    );
}
