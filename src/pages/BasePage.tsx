import { Box, Button, Typography, AppBar, Container, Toolbar, Link, Paper } from "@mui/material"

import { Link as RouterLink, Outlet } from 'react-router-dom'

export const BasePage = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={RouterLink} to="/admin/veiculos">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Veiculos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/veiculos/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Veiculo
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}
