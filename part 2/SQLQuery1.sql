use FamilyTrie
/*CREATE TABLE People (
    Person_Id INT PRIMARY KEY,
    Personal_Name VARCHAR(100),
    Family_Name VARCHAR(100),
    Gender VARCHAR(10),
    Father_Id INT,
    Mother_Id INT,
    Spouse_Id INT
);

CREATE TABLE Family_Relationships (
    Person_Id INT,
    Relative_Id INT,
    Connection_Type VARCHAR(50),
    FOREIGN KEY (Person_Id) REFERENCES People(Person_Id),
    FOREIGN KEY (Relative_Id) REFERENCES People(Person_Id)
	INSERT INTO Family_Relationships(select Relative_Id,Person_Id,Connection_Type from Family_Relationships 
where Person_Id=spouse_Id 
NOT EXISTS
select Person_Id,Relative_Id,Connection_Type from Family_Relationships where Relative_Id=spouse_Id)
);*/


/*INSERT INTO Family_Relationships (Person_Id, Relative_Id, Connection_Type)
(Select A.Person_Id , A.Spouse_Id , CASE WHEN A.Gender = 'בן' THEN 'בת זוג' ELSE 'בן זוג' END
From People A
left join Family_Relationships B
On A.Person_Id=B.Person_Id AND A.Spouse_Id=B.Relative_Id
WHERE B.Person_Id IS NULL 
AND A.Spouse_Id IS NOT NULL)*/

SELECT * from Family_Relationships



