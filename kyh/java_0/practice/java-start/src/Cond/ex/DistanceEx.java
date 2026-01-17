package Cond.ex;

public class DistanceEx {
    public static void main(String[] args) {
        int distance = 1;
        String method;

        if (distance <= 1){
            method = "도보";
        } else if (distance <= 10){
            method = "자전거";
        } else if (distance <= 100) {
            method = "자동차";
        } else {
             method = "비행기";
        }

        System.out.println(method + "를 이용하세요.");

    }
}
