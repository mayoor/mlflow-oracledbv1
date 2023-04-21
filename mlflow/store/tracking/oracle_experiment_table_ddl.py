EXPERIMENT_ID_AUTO_INC_SEQUENCE = "CREATE SEQUENCE experiment_id_seq START WITH 1 INCREMENT BY 1"

EXPERIMENT_ID_AUTO_INC_TIGGER = """

CREATE OR REPLACE TRIGGER experiment_id_autoinc BEFORE
    INSERT ON experiments
    FOR EACH ROW
BEGIN
    IF :NEW.experiment_id IS NULL THEN
        :NEW.experiment_id := experiment_id_seq.nextval;
    END IF;
END;
"""

