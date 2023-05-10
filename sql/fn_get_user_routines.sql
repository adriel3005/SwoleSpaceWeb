CREATE OR REPLACE FUNCTION get_user_routines(uid uuid)
RETURNS table (user_routine_id uuid ,
  user_id uuid,
  created_at timestamptz,
  routine_name text,
  routine_description text)

AS $$
DECLARE
BEGIN
    return query select ur.*  
    From user_routine ur where  ur.user_id = $1;
END;
$$ LANGUAGE plpgsql;