CREATE OR REPLACE FUNCTION insert_user_routine(urID uuid, userid uuid, r_name text, r_description text)
  RETURNS void AS
  $BODY$
      BEGIN
        INSERT INTO user_routine(user_routine_id, user_id, routine_name, routine_description)
        VALUES(urID, userid, r_name, r_description);
      END;
  $BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;