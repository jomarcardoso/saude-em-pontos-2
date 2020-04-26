import React from 'react'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';
import Main from '../components/main';
import { Link } from "gatsby-theme-material-ui";

function AdvertisePage() {
  return (
    <Main>
      <Container maxWidth="sm">
        <Typography>
          Olá, fico feliz que tenha vindo nos conhecer 😁, acredito que seremos bons amigos. Antes de começar qualquer coisa por aqui gostaria que lesse as instruções abaixo.
        </Typography>
        <Typography variant="h2" component="h1">
          Alimentos
        </Typography>
        <Typography>
          Os dados nutricionais de alimentos são muito relativos, não podemos definir quantas calorias em uma fruta que tem vários atributos, como:
        </Typography>
        <List>
          <ListItem>peso</ListItem>
          <ListItem>espécie</ListItem>
          <ListItem>maturação</ListItem>
        </List>
        <Typography variant="h2" component="h1">
          Exercícios
        </Typography>
        <Typography>
          Tem tanta coisa que influencia aqui
        </Typography>
        <List>
          <ListItem>intensidade</ListItem>
          <ListItem>execução</ListItem>
          <ListItem>elevações e declínio</ListItem>
        </List>
        <Typography variant="h2" component="h1">
          Individualidades
        </Typography>
        <List>
          <ListItem>biotipo</ListItem>
          <ListItem>gasto calórico</ListItem>
          <ListItem>atividades rotineiras</ListItem>
        </List>
        <Typography>
          <Link to="/menu">Avançar</Link>
        </Typography>
      </Container>
    </Main>
  )
}

export default AdvertisePage;