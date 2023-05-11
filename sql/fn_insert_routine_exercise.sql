CREATE OR REPLACE FUNCTION insert_routine_exercise(reID uuid, urID uuid, eID integer, rep integer, sets integer, dw integer, userid uuid, eo integer)
  RETURNS void AS
  $BODY$
      BEGIN
        INSERT INTO routine_exercise(routine_exercise_id, user_routine_id, exercise_id, repetition, sets, default_weight, user_id, exercise_order)
        VALUES(reID, urID, eID, rep, sets, dw, userid, eo);
      END;
  $BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;