import React, { FC, useContext, useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, FieldArray, ArrayHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Image from './image';
import { Meal, MealData, MEAL, MEAL_DATA } from '../services/meal';
import SubmitComponent from './submit';
import AccountContext from '../contexts/account-context';
import PortionService from '../services/portion/portion.service';
import FoodsContext from '../contexts/foods-context';
import ResumedPortion from './resumed-portion';
import StyleContext from '../contexts/style';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
  },
  imageBanner: {
    padding: '30px',
  },
});

interface Props {
  mealData: MealData;
  meal: Meal;
  setId: (id: number) => void;
}

interface MealForm {
  portions: Array<string>;
  name: string;
  description: string;
  preparation: string;
}

const MealRegister: FC<Props> = ({
  mealData = MEAL_DATA,
  meal = MEAL,
  setId,
}) => {
  const classes = useStyles();
  const { setAccount } = useContext(AccountContext);
  const foods = useContext(FoodsContext);
  let { portions = [''] } = mealData;
  const [editing, setEditing] = useState(true);
  const { style, setStyle } = useContext(StyleContext);

  const initialFullPortions =
    portions.map((portionToProcess) => {
      return PortionService.portionFromString({
        text: portionToProcess,
        foods,
      });
    }) ?? [];

  const [fullPortions, setFullPortions] = useState(initialFullPortions);

  if (!portions.length) {
    portions = [''];
  }

  function handleBlur({ target: { value = '' } }, index = 0) {
    const portion = PortionService.portionFromString({
      text: value,
      foods,
    });

    const copyFullPortions = [...fullPortions];

    copyFullPortions[index] = portion;

    setFullPortions(copyFullPortions);
  }

  function handleSubmit({
    name = '',
    description = '',
    preparation = '',
    portions: portionsData = [],
  }: MealForm): void {
    const id = setAccount.meal({
      portions: portionsData,
      name,
      description,
      id: mealData?.id ?? 0,
      preparation,
    });

    setId(id);
    setEditing(false);
  }

  useEffect(() => {
    setStyle({
      ...style,
      bgBody: editing ? 'white' : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  return (
    <Formik
      initialValues={{
        portions,
        name: mealData.name,
        description: mealData.description,
        preparation: mealData.preparation,
      }}
      onSubmit={handleSubmit}
      render={({ values, handleBlur: formikHandleBlur, handleChange }) => (
        <Form action="/" method="post">
          <FieldArray name="portions">
            {({ push, remove }: ArrayHelpers) => (
              <Grid container spacing={3}>
                {!editing && (
                  <Grid item>
                    <Box
                      bgcolor="white"
                      className={classes.imageBanner}
                      border={1}
                      borderColor="grey.600"
                      borderRadius={4}
                    >
                      <Grid container justify="center">
                        <Grid item xs={6}>
                          <Image src={meal.image} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12}>
                  {!editing ? (
                    <Typography variant="h1" component="h2">
                      {values.name}
                      <IconButton onClick={() => setEditing(true)}>
                        <EditRoundedIcon />
                      </IconButton>
                    </Typography>
                  ) : (
                    <FormControl
                      variant="standard"
                      className={classes.formControl}
                    >
                      <TextField
                        name="name"
                        label="Nome da receita"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={formikHandleBlur}
                        variant="filled"
                      />
                    </FormControl>
                  )}
                </Grid>
                {(editing || meal.description) && (
                  <Grid item xs={12}>
                    {editing ? (
                      <FormControl
                        variant="standard"
                        className={classes.formControl}
                      >
                        <TextField
                          multiline
                          name="description"
                          label="Descrição"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={formikHandleBlur}
                          variant="filled"
                        />
                      </FormControl>
                    ) : (
                      <Typography>{meal.description}</Typography>
                    )}
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Grid container spacing={editing ? 3 : 1}>
                    {values.portions.map((value, index) => (
                      <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="stretch">
                          {editing ? (
                            <ResumedPortion
                              portion={fullPortions[index]}
                              xs={2}
                              hideBadge
                              padding={6}
                            />
                          ) : (
                            <Grid item xs={1}>
                              {fullPortions.length && (
                                <Image
                                  src={fullPortions[index].food.image}
                                  alt={fullPortions[index].food.name}
                                />
                              )}
                            </Grid>
                          )}
                          <Grid item xs={editing ? 10 : 11}>
                            <FormControl
                              variant="standard"
                              className={classes.formControl}
                            >
                              {editing ? (
                                <TextField
                                  variant="filled"
                                  type="text"
                                  label={
                                    <>
                                      {`Ingrediente ${index + 1}`}
                                      <IconButton
                                        color="secondary"
                                        aria-label={`remover alimento ${
                                          index + 1
                                        }`}
                                        onClick={() => remove(index)}
                                        size="small"
                                      >
                                        <CloseIcon fontSize="small" />
                                      </IconButton>
                                    </>
                                  }
                                  name={`portions.${index}`}
                                  onChange={handleChange}
                                  onBlur={(event) => {
                                    formikHandleBlur(event);
                                    handleBlur(event, index);
                                  }}
                                  value={value}
                                />
                              ) : (
                                <Typography>{value}</Typography>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    {editing && (
                      <Grid item xs={12}>
                        <Button variant="outlined" onClick={() => push('')}>
                          Adicionar
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {editing ? (
                  <Grid item xs={12}>
                    <FormControl
                      variant="standard"
                      className={classes.formControl}
                    >
                      <TextField
                        multiline
                        name="preparation"
                        label="Modo de preparo"
                        value={values.preparation}
                        onChange={handleChange}
                        onBlur={formikHandleBlur}
                        variant="filled"
                      />
                    </FormControl>
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h3" component="h3" align="center">
                        Modo de preparo
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {meal.preparation.split(/\n\s/).map((preparationLine) => (
                        <Grid container spacing={1}>
                          <Grid item>
                            <Typography>{preparationLine}</Typography>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
                {editing && (
                  <Grid item xs={12}>
                    <SubmitComponent>Cadastrar refeição</SubmitComponent>
                  </Grid>
                )}
              </Grid>
            )}
          </FieldArray>
        </Form>
      )}
    />
  );
};

export default MealRegister;
