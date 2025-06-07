import os
import threading
from collections import Counter
import heapq


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


def count_errors_in_divide_file(divide_file, results, index):
    counter = Counter()
    with open(divide_file, 'r', encoding='utf-8') as file:
        for line in file:
            error_code = line.strip().split()[-1].strip('"\'')
            counter[error_code] += 1
    results[index] = counter


def merge_counters(counters):
    final_counter = Counter()
    for counter in counters:
        final_counter.update(counter)
    return final_counter


def get_top_n_errors_parallel(log_file, number_of_occurrences):
    split_file(log_file)
    divide_files = [f for f in os.listdir() if f.startswith("divide_file_")]
    results = [None] * len(divide_files)
    threads = []
    for i, divide_file in enumerate(divide_files):
        thread = threading.Thread(target=count_errors_in_divide_file, args=(divide_file, results, i))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    final_counter = merge_counters(results)
    return heapq.nlargest(number_of_occurrences, final_counter.items(), key=lambda x: x[1])


if __name__ == "__main__":
    log_file = "logs.txt"
    print("Insert number of occurrences:")
    number_of_occurrences = int(input())
    top_errors = get_top_n_errors_parallel(log_file, number_of_occurrences)
    print(top_errors)
"""
הפתרון מחלק את הקובץ לקטעים ומעבד כל אחד בנפרד במקביל, מה שמאפשר עבודה יעילה על קבצים גדולים. זמן
הריצה הכולל הוא בקירוב O(M) לעיבוד כל השורות, אך בעזרת ריבוי תהליכים הזמן יכול להתקצר לכיוון O(M/T)
מיזוג התוצאות לוקח זמן O(N×K) במקביל , וחיפוש השגיאות השכיחות ביותר נעשה ב-
O(Klogn)
מבחינת זיכרון, הפתרון שומר מונים בגודל O(K) ותופס מקום זמני נוסף עבור הקבצים המחולקים בגודל O(M).
"""
