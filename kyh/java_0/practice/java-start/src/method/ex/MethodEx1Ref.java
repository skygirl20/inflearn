package method.ex;

public class MethodEx1Ref {
    public static void main(String[] args) {
        double avg = average(1,2,3);
        System.out.println("평균값: " + avg);

        avg = average(15,25,35);
        System.out.println("평균값: " + avg);
    }

    public static double average(int a, int b, int c){
        int sum = a + b + c;
        return sum / 3.0;
    }
}
