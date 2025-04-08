import os

import pandas as pd


# part 1
def double_valid(df):
    duplicate_rows = df[df.duplicated()]
    if not duplicate_rows.empty:
        print("Duplicate rows found")
        df_clean = df.drop_duplicates()
        df_clean.to_csv("file_without_duplicates.csv", index=False)
        return df_clean
    else:
        print("No duplicate lines")
        return df


def missing_data(df):
    df = df.copy()
    df['value'] = pd.to_numeric(df['value'], errors='coerce')
    df_clean = df.dropna(subset=['value'])
    df_clean.to_csv("file_without_missing_values.csv", index=False)
    return df_clean


# part 4
"""
קובץ Parquet עדיף כאן מכיוון שהוא מציע דחיסה יעילה, שמפחיתה את גודל הקובץ ומשפרת את ביצועי הקריאה והכתיבה
 בנוסף, פורמט זה מאפשר טעינה של נתונים בצורה ממוקדת
מה שצפוי לשפר את ביצועי השאילתות על נתונים גדולים, ומאפשר גישה מהירה יותר לעיבוד נתונים בזמן אמת או בשאילתות מבוזרות.
"""
def read_file(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == '.csv':
        return pd.read_csv(file_path)
    elif ext == '.parquet':
        return pd.read_parquet(file_path)
    else:
        raise ValueError("File format is not supported (only CSV or Parquet)")


def clean_none_data(file_path):
    df = read_file(file_path)
    df_no_duplicates = double_valid(df)
    df_no_missing_values = missing_data(df_no_duplicates)
    return df_no_missing_values


# part 2
def avg(file_path):
    df = clean_none_data(file_path)
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce', dayfirst=True)
    df['value'] = pd.to_numeric(df['value'], errors='coerce')
    df = df.dropna(subset=['timestamp', 'value'])
    result = df.groupby(pd.Grouper(key='timestamp', freq='h'))['value'].mean().reset_index()
    result.to_csv("averaged_data.csv", index=False)
    return result


# part 3

def avg_day(file_path):
    df = clean_none_data(file_path)
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce', dayfirst=True)
    df['value'] = pd.to_numeric(df['value'], errors='coerce')
    df = df.sort_values(by='timestamp')
    df = df.dropna(subset=['timestamp', 'value'])
    unique_dates = df['timestamp'].dt.date.unique()
    all_results = []
    for day in unique_dates:
        daily_data = df[df['timestamp'].dt.date == day]
        daily_avg = daily_data.groupby(pd.Grouper(key='timestamp', freq='h'))['value'].mean().reset_index()
        all_results.append(daily_avg)
    final_result = pd.concat(all_results)
    final_result.to_csv("averaged_data_by_day.csv", index=False)
    return final_result


print(avg("time_series.parquet"))

# question
# אם הנתונים מגיעים בזרימה (stream) במקום מקובץ, כיצד תתכנני את הפתרון כדי לעדכן את הממוצעים השעתיים בזמן אמת?

# answer
"""
 כאשר נתונים מתקבלים בזרימה (stream), ניתן לעבד אותם ביעילות בזמן אמת באמצעות טבלת גיבוב (Hash Table)
 שבה כל מפתח מייצג שעה מדויקת (למשל 2025-06-01 14:00:00), והערך הנלווה שומר את סכום הערכים שהתקבלו באותה שעה ומספרם.
 כך, עם הגעת כל רשומה חדשה, ניתן לעדכן את הסכום והמונה של אותה שעה באופן מיידי ולחשב את הממוצע השעתי בלי לשמור את כל הנתונים ההיסטוריים בזיכרון
 הפתרון הזה אינו דורש גישה חוזרת לנתונים קודמים,
  מה שהופך אותו למהיר מאוד ויעיל מבחינת זיכרון, ומתאים במיוחד למערכות זמן אמת שבהן חשוב להגיב במהירות לנתונים נכנסים.
 השימוש בטבלת גיבוב גם מאפשר גישה ועדכון ב־O(1) בממוצע, מה שמקנה יתרון משמעותי בקנה מידה גדול.
"""
