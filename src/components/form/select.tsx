import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import MaterialSelect from '@material-ui/core/Select';
import AgnosticSelect from '../vendors/agnostic-components/form/select';

const useStyles = makeStyles({
  select: {
    display: 'flex',
  },
  selectIcon: {
    alignItems: 'center',
    minWidth: '20px',
    width: '20px',
    marginRight: '10px',
  },
  img: {
    width: '100%',
  },
  option: {
    display: 'flex',
  },
});

interface Props {
  form;
  options;
  name;
}

const Select: React.SFC<Props> = ({ fields, options, name }) => {
  const classes = useStyles();

  return (
    <AgnosticSelect
      fields={fields}
      name={name}
      render={(selectProps) => (
        <MaterialSelect
          className={classes.select}
          classes={{
            select: classes.select,
          }}
          labelId="food"
          id="select"
          {...selectProps}
        >
          {selectProps.children}
        </MaterialSelect>
      )}
      renderOptions={(optionProps) => (
        <MenuItem value={optionProps.value} className={classes.option}>
          <ListItemIcon className={classes.selectIcon}>
            <img className={classes.img} src={optionProps.image} alt="" />
          </ListItemIcon>
          <ListItemText primary={optionProps.name} />
        </MenuItem>
      )}
      options={options}
    />
  );
};

export default Select;
