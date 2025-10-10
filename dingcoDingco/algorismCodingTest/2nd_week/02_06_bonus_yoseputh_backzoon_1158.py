# BOJ 1158
# N명의 사람이 원을 이루고 있을때 N보다 작은 K번째의 사람이 제거되고
# 제거된 뒤 다시 남은 사람들이 기존 원이 있다 생각하고 순서대로 제거됨.
# 이를 (N,K) = <제거된 순서>라고 한다.

# ex) (7,3)이라면 <3, 6, 2, 7, 5, 1, 4 >
#       1
#    7     2
#           3
#    6     4
#       5

def josephus_problem(n, k):
   # 이 부분을 채워보세요!
    i = 1
    new = []
    while i != n + 1:
        new.append(i)
        i += 1

    result = [] # 제거된 순서
    index = 0   # 현재 index

    while new:
        index = (index + k - 1) % len(new)  # 다음 제거할 사람의 인덱스
        result.append(new.pop(index))       # 제거 후 result에 추가

    print("<" + ", ".join(map(str, result)) + ">")


n, k = map(int, input().split())
josephus_problem(n, k)