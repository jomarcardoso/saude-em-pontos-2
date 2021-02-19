import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Main from './main';

const Advertise: FC = () => (
  <Main>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1">Esclarecimentos</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              Olá, fico feliz que tenha vindo nos conhecer 😁, acredito que
              seremos bons amigos. Antes de começar qualquer coisa por aqui
              gostaria que lesse as instruções abaixo.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Alimentos</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Os dados nutricionais de alimentos são muito relativos, não
              podemos definir quantas calorias em uma fruta que tem vários
              atributos, como:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              <ListItem>peso</ListItem>
              <ListItem>espécie</ListItem>
              <ListItem>maturação</ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Exercícios</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Tem tanta coisa que influencia aqui</Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              <ListItem>intensidade</ListItem>
              <ListItem>execução</ListItem>
              <ListItem>elevações e declínio</ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Individualidades</Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              <ListItem>biotipo</ListItem>
              <ListItem>gasto calórico</ListItem>
              <ListItem>atividades rotineiras</ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h1">Agradecimentos</Typography>
      </Grid>
      <Grid item xs={12}>
        <div>
          Icons made by{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </Grid>
    </Grid>
  </Main>
);

export default Advertise;
