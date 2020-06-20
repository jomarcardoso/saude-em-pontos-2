import React, { useContext } from 'react';
// import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AccountContext from '../contexts/account-context';
import { useForm } from './vendors/agnostic-components/form';
import InputNumber from './form/input-number';
import Input from './form/input';
import Radio from './form/radio';
import Grid from '@material-ui/core/Grid';
import { Biotype } from '../services/user.service';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Quiz: React.SFC = () => {
  const {
    setAccount,
    account: { user },
  } = useContext(AccountContext);
  const classes = useStyles();
  const [biotype, setBiotype] = React.useState('female');
  const [objectives, setObjectives] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { fields: inputs } = useForm({
    initialValues: {
      age: user.age,
      name: user.name,
      biotype: user.biotype,
    },
  });

  function handleChange(event: React.SyntheticEvent): void {
    const target = event.target as HTMLInputElement;
    setObjectives(target.value);
  }

  function handleClose(): void {
    setOpen(false);
  }

  function handleOpen(): void {
    setOpen(true);
  }

  const handleChangeObjectives = (event: React.ChangeEvent): void => {
    const target = event.target as HTMLInputElement;
    setBiotype(target.value);
  };

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    setAccount.user({
      age: Number(inputs.values.age),
      biotype: Biotype.ECTOMORPH,
      name: inputs.values.name,
      objectives: [],
    });
  }

  return (
    <div>
      <form action="/" method="get" onSubmit={handleSubmit}>
        <Grid container spacing={4} justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={10}>
                <Input fields={inputs} name="name" label="Nome" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={10}>
                  <InputNumber fields={inputs} name="age" label="Idade" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={10}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Biotipo</FormLabel>
                  <RadioGroup
                    aria-label="Biotipo"
                    name="gender1"
                    value={biotype}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="ectomorph"
                      control={
                        <Radio
                          fields={inputs}
                          name="biotype"
                          defaultValue="ectomorph"
                        />
                      }
                      label="Ectomorfo"
                    />
                    <FormControlLabel
                      value="mesomorph"
                      control={
                        <Radio
                          fields={inputs}
                          name="biotype"
                          defaultValue="mesomorph"
                        />
                      }
                      label="Mesomorfo"
                    />
                    <FormControlLabel
                      value="endomorph"
                      control={
                        <Radio
                          fields={inputs}
                          name="biotype"
                          defaultValue="endomorph"
                        />
                      }
                      label="Endomorfo"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Pronto
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Quiz;
