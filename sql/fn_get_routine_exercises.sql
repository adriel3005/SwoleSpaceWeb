CREATE OR REPLACE FUNCTION get_routine_exercises(urID uuid)
RETURNS table (routine_exercise_id uuid,
  exercise_id int8,
  repetition int8,
  sets int8,
  user_id uuid,
  user_routine_id uuid,
  exercise_order int8
)
AS $$
DECLARE
BEGIN
    return query select ur."routine_exercise_id", ur."exercise_id", ur."repetition", ur."sets", ur."user_id", ur."user_routine_id", ur."exercise_order"
    From routine_exercise ur where  ur.user_routine_id = $1 order by ur.exercise_order ;
END;
$$ LANGUAGE plpgsql;