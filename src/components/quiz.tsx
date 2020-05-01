import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { SetUser } from '../services/account.service';
import AccountContext from './account-context';

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
  const { setAccount } = useContext(AccountContext);
  const classes = useStyles();
  const [biotype, setBiotype] = React.useState('female');
  const [objectives, setObjectives] = React.useState('');
  const [open, setOpen] = React.useState(false);

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
      name: 'Jomar',
      age: 29,
      objectives: ['health', 'muscle'],
    });
  }

  return (
    <div>
      <form action="/" method="get" onSubmit={handleSubmit}>
        <div>
          <TextField id="name" label="Nome" />
        </div>
        <div>
          <TextField id="age" label="Idade" />
        </div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="Biotipo"
              name="gender1"
              value={biotype}
              onChange={handleChange}
            >
              <FormControlLabel
                value="ectomorph"
                control={<Radio />}
                label="Ectomorfo"
              />
              <FormControlLabel
                value="mesomorph"
                control={<Radio />}
                label="Mesomorfo"
              />
              <FormControlLabel
                value="endomorph"
                control={<Radio />}
                label="Endomorfo"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Objetivos
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={objectives}
              onChange={handleChangeObjectives}
            >
              <MenuItem value="">
                <em>Nenhuma das opções</em>
              </MenuItem>
              <MenuItem value="lose-weight">Emagrecer</MenuItem>
              <MenuItem value="health">Saúde</MenuItem>
              <MenuItem value="muscle">Músculação</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" color="primary" type="submit">
          Pronto
        </Button>
      </form>
    </div>
  );
};

export default Quiz;
