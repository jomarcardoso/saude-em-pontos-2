import React, { ChangeEvent, FocusEvent, FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputFilled from '../input-filled/input-filled';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
    position: 'relative',
  },
  floating: {
    position: 'absolute',
    right: '0',
    top: '0',
  },
});

const InputIngredient: FC<{
  index: number;
  value: string;
  remove(index: number): void;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}> = ({ index = 0, value = '', remove, onChange, onBlur }) => {
  const classes = useStyles();

  return (
    <FormControl variant="standard" className={classes.formControl}>
      <InputFilled
        type="text"
        label={`Ingrediente ${index + 1}`}
        name={`portions.${index}`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      <IconButton
        className={classes.floating}
        aria-label={`remover alimento ${index + 1}`}
        onClick={() => remove(index)}
        size="small"
      >
        <CloseIcon />
      </IconButton>
    </FormControl>
  );
};

export default InputIngredient;
