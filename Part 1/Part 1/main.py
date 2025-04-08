import heapq
import os
from collections import Counter


def split_file(input_file, divide_file_size=10 ** 6, output_prefix="divide_file_"):
    with open(input_file, "r", encoding="utf-8") as infile:
        divide_file_number = 0
        while True:
            lines = infile.readlines(divide_file_size)
            if not lines:
                break
            divide_file_name = f"{output_prefix}{divide_file_number}.txt"
            with open(divide_file_name, 'w', encoding='utf-8') as outfile:
                outfile.writelines(lines)
            divide_file_number += 1


def count_errors_in_divide_file(divide_file):
    counter = Counter()
    with open(divide_file, 'r', encoding='utf-8') as file:
        for line in file:
            error_code = line.strip().split()[-1].strip('"\'')
            counter[error_code] += 1
    return counter


def merge_counters(counters):
    final_counter = Counter()
    for counter in counters:
        final_counter.update(counter)
    return final_counter


def get_top_n_errors(log_file, number_of_occurrences):
    split_file(log_file)

    divide_files = [f for f in os.listdir() if f.startswith("divide_file_")]
    counters = [count_errors_in_divide_file(divide_file) for divide_file in divide_files]

    final_counter = merge_counters(counters)

    return heapq.nlargest(number_of_occurrences, final_counter.items(), key=lambda x: x[1])


log_file = "logs.txt"
print("insert number of occurrences")
number_of_occurrences = int(input())
top_errors = get_top_n_errors(log_file, number_of_occurrences)
print(top_errors)
"""
,השורות בקובץ הלוגים כדי לספור מופעים של קודי שגיאה שונים M האלגוריתם עובר על כל 
,(K ≤ M כאשר), קודים ייחודיים K שגיאות השכיחות ביותר מתוך N זמן. לאחר מכן, הוא מוצא את O(M) לכן שלב זה לוקח
.O(K log N). שלב זה מבוצע בזמן .N בגודל heap באמצעות מבנה 
.O(M + K log N) לכן, זמן הריצה הכולל של האלגוריתם הוא 
 מקום בזיכרון .O(K) ולכן צורך K מבחינת זיכרון, האלגוריתם שומר טבלת שכיחויות בגודל
"""

