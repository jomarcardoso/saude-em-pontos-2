import React from 'react'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Main from './main';

function Advertise() {
  return (
    <Main>

      <Typography variant="h3" component="h1">
        Esclarecimentos
      </Typography>
      <Typography>
        Olá, fico feliz que tenha vindo nos conhecer 😁, acredito que seremos bons amigos. Antes de começar qualquer coisa por aqui gostaria que lesse as instruções abaixo.
      </Typography>
      <Typography variant="h4" component="h2">
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
      <Typography variant="h4" component="h2">
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
      <Typography variant="h4" component="h2">
        Individualidades
      </Typography>
      <List>
        <ListItem>biotipo</ListItem>
        <ListItem>gasto calórico</ListItem>
        <ListItem>atividades rotineiras</ListItem>
      </List>

      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </Main>
  )
}

export default Advertise;