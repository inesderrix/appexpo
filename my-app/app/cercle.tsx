import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";

export default function BackgroundCircles() {
    const topLeftAnim = useRef(new Animated.Value(0)).current;
    const middleRightAnim = useRef(new Animated.Value(0)).current;
    const bottomCenterAnim = useRef(new Animated.Value(0)).current;

    const animateCircle = (anim: Animated.Value, distance: number) => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, { toValue: distance, duration: 4000, useNativeDriver: true }),
                Animated.timing(anim, { toValue: -distance, duration: 4000, useNativeDriver: true }),
                Animated.timing(anim, { toValue: 0, duration: 4000, useNativeDriver: true }),
            ])
        ).start();
    };

    useEffect(() => {
        animateCircle(topLeftAnim, 15);       
        animateCircle(middleRightAnim, 10);   
        animateCircle(bottomCenterAnim, 12);  
    });

    return (
        <>
            <Animated.View
                style={[
                    styles.circle,
                    styles.topLeft,
                    { width: 350, height: 350, borderRadius: 175, transform: [{ translateX: topLeftAnim }] },
                ]}
            />

            <Animated.View
                style={[
                    styles.circle,
                    styles.middleRight,
                    { width: 250, height: 250, borderRadius: 125, transform: [{ translateY: middleRightAnim }] },
                ]}
            />

            <Animated.View
                style={[
                    styles.circle,
                    styles.bottomCenter,
                    { width: 180, height: 180, borderRadius: 90, transform: [{ translateX: bottomCenterAnim }] },
                ]}
            />
        </>
    );
}

const styles = StyleSheet.create({
    circle: {
        position: "absolute",
        backgroundColor: "rgba(0,122,255,0.2)",
    },
    topLeft: { top: -50, left: -50 },
    middleRight: { top: 300, right: -80 },
    bottomCenter: { bottom: -80, left: "5%" },
});
