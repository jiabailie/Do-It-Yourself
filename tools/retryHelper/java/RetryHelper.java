package tools.retryHelper.java;

import java.util.function.Function;

public class RetryHelper {
    private static RetryHelper instance = null;

    // Default retry times
    private static final int RETRY_LIMITATION = 2;

    private static final String KEY_HTTP_BAD_GATEWAY = "502";

    // Dynamic setting retry times
    private final int retryTimes;

    private RetryHelper(final int retryTimes) {
        this.retryTimes = retryTimes;
    }
    public static RetryHelper getInstance() {
        if (instance == null) {
            instance = new RetryHelper(RETRY_LIMITATION);
        }
        return instance;
    }

    public static RetryHelper newInstance(final int retryTimes) {
        return new RetryHelper(retryTimes);
    }

    @FunctionalInterface
    public interface ExFunction<T, R, E extends Exception> {
        R apply(T t) throws Exception;
    }

    public <T, R, E extends Exception> Function<T, R> retryHandler(ExFunction<T, R, E> fn) {
        return t -> {
            int retriedTimes = 0;

            while (retriedTimes < retryTimes) {
                try {
                    // call the function if retried less than retryTimes
                    return fn.apply(t);
                } catch (Exception e) {
                    if (!e.getMessage().contains(KEY_HTTP_BAD_GATEWAY)) {
                        throw new RuntimeException(e);
                    }
                    retriedTimes++;
                }
            }

            // If failed retryTimes, throw message to notify the status
            throw new RuntimeException(String.format("Retry %s times failed!", retryTimes));
        };
    }
}
